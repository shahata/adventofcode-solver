import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

function removeIgnoredDays(jsonArr) {
  jsonArr.forEach(json => {
    if (json.event === '2020') {
      Object.values(json.members).forEach(member => {
        delete member.completion_day_level['1'];
      });
    }
    if (json.event === '2018') {
      Object.values(json.members).forEach(member => {
        delete member.completion_day_level['6'];
      });
    }
  });
}

function calcChart(members, sorted, count) {
  const leaders = members
    .filter((m, i, a) => a[0].stars - m.stars <= 4)
    .slice(0, count)
    .map(member => {
      const pointsPerDay = [];
      sorted.forEach(day => {
        const pointsPerStar = day.map(stars => {
          const star = stars.find(x => x.name === member.label);
          return star ? members.length - stars.indexOf(star) : 0;
        });
        pointsPerDay.push(...pointsPerStar.reverse());
      });
      const data = pointsPerDay.reduce((prev, today) => {
        return prev.concat([
          today + (prev.length === 0 ? 0 : prev[prev.length - 1]),
        ]);
      }, []);
      while (
        data.length > 1 &&
        data[data.length - 1] === data[data.length - 2]
      ) {
        data.pop();
      }
      return {
        label: member.label,
        pointsPerDay: data,
        stars: member.stars,
        leadPerDay: 0,
      };
    });
  leaders.forEach(member => {
    member.leadPerDay = member.pointsPerDay.map((p, i) => {
      const comparable = leaders
        .filter(m => m.stars === members[0].stars)
        .sort((a, b) => a.pointsPerDay[i] - b.pointsPerDay[i]);
      const median = comparable[Math.floor(comparable.length / 2)];
      return p - median.pointsPerDay[i];
    });
  });
  const config = {
    type: 'line',
    options: {
      plugins: {
        colorschemes: {
          scheme: 'brewer.Paired12',
        },
      },
    },
    data: {
      labels: new Array(50)
        .fill()
        .map((x, i) => `Day ${Math.floor(i / 2) + 1}-${Math.floor(i % 2) + 1}`),
      datasets: leaders.map(member => {
        return {
          label: member.label,
          data: member.leadPerDay,
          fill: false,
        };
      }),
    },
  };
  return config;
}

export function calcLeaderboard(jsonArr) {
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  const jsonPath = path.resolve(__dirname, 'leaderboards.json');
  const debugMode = false;
  if (jsonArr) {
    if (debugMode) {
      fs.writeFileSync(jsonPath, JSON.stringify(jsonArr));
    }
  } else if (debugMode) {
    jsonArr = JSON.parse(fs.readFileSync(jsonPath).toString());
  } else {
    return;
  }
  removeIgnoredDays(jsonArr);

  const members = Object.values(
    jsonArr
      .reverse()
      .map(x => x.members)
      .reduce((a, b) => ({ ...a, ...b }), {}),
  );
  const days = new Array(25).fill().map(() => [[], []]);
  members.forEach(member => {
    const name = member.name || `(anonymous user #${member.id})`;
    member.label = name;
    for (const [day, stars] of Object.entries(member.completion_day_level)) {
      const index = parseInt(day) - 1;
      if (stars['1']) {
        days[index][0].push({ name, ts: parseInt(stars['1'].get_star_ts) });
      }
      if (stars['2']) {
        days[index][1].push({ name, ts: parseInt(stars['2'].get_star_ts) });
      }
    }
  });
  const sorted = days.map(day =>
    day.reverse().map(stars =>
      stars
        .sort((a, b) => a.ts - b.ts)
        .map(star => ({
          name: star.name,
          ts: new Date(star.ts * 1000).toLocaleString('en-GB', {
            hour12: false,
            second: '2-digit',
            minute: '2-digit',
            hour: '2-digit',
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            timeZone: 'America/New_York',
          }),
        })),
    ),
  );
  members.sort((a, b) => b.local_score - a.local_score);
  const config = {
    all: calcChart(members, sorted, 1000),
    ten: calcChart(members, sorted, 10),
    five: calcChart(members, sorted, 5),
  };
  let output = [''];
  output.push(
    '<script src="https://unpkg.com/chart.js@2.9.3/dist/Chart.min.js" crossorigin="anonymous"></script>',
    '<script src="https://unpkg.com/chartjs-plugin-colorschemes@0.4.0/dist/chartjs-plugin-colorschemes.min.js" crossorigin="anonymous"></script>',
  );
  output.push(
    [
      '<button onclick="drawChart(\'all\')">Show All</button>',
      '<button onclick="drawChart(\'ten\')">Show Top Ten</button>',
      '<button onclick="drawChart(\'five\')">Show Top Five</button>',
      '<canvas id="canvas"></canvas>',
      '<script>',
      `var config = ${JSON.stringify(config)};`,
      'window.drawChart = function(group) {',
      '  window.myLine.data = JSON.parse(JSON.stringify(config[group].data));',
      '  window.myLine.update();',
      '};',
      'window.onload = function() {',
      '  var ctx = document.getElementById("canvas").getContext("2d");',
      `  window.myLine = new Chart(ctx, JSON.parse(JSON.stringify(config.all)));`,
      '};',
      '</script>',
    ].join('\n'),
  );
  const spans = [
    '<span class="leaderboard-daydesc-both">both stars</span>',
    'the <span class="leaderboard-daydesc-first">first star</span>',
  ];
  output.push('<table>');
  sorted.reverse().forEach((day, index) => {
    output.push('<tr style="vertical-align: top;">');
    day.forEach((stars, starIndex) => {
      output.push('<td style="padding-right: 50px;">');
      if (stars.length) {
        output.push(
          `<p>First to get ${spans[starIndex]} on Day ${25 - index}:</p>`,
        );
        stars.forEach((star, index) => {
          const paddedIndex = `${index + 1}`.padStart(
            `${stars.length}`.length,
            ' ',
          );
          output.push(
            [
              `<div class="leaderboard-entry"><span class="leaderboard-position">`,
              `${paddedIndex})</span> <span class="leaderboard-time">${star.ts}`,
              `</span> ${star.name}</div> `,
            ].join(''),
          );
        });
      }
      output.push('</td>');
    });
    output.push('</tr>');
  });
  output.push('</table>');
  return output.join('\n');
}
