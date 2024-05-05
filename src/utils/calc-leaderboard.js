import * as path from 'node:path';
import { fileURLToPath } from 'node:url';
import { readFileSync, writeFileSync } from 'node:fs';
import { imports } from './urls.js';

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
  let leaders = members
    .filter((m, i, a) => a[0].stars - m.stars <= 4)
    .slice(0, count)
    .map(member => {
      let pointsPerDay = [];
      sorted.forEach(day => {
        let pointsPerStar = day.map(stars => {
          let star = stars.find(x => x.name === member.label);
          return star ? members.length - stars.indexOf(star) : 0;
        });
        pointsPerDay.push(...pointsPerStar.reverse());
      });
      let data = pointsPerDay.reduce((prev, today) => {
        return prev.concat([today + (prev.length === 0 ? 0 : prev.at(-1))]);
      }, []);
      while (data.length > 1 && data.at(-1) === data.at(-2)) {
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
      let comparable = leaders
        .filter(m => m.stars === members[0].stars)
        .sort((a, b) => a.pointsPerDay[i] - b.pointsPerDay[i]);
      let median = comparable[Math.floor(comparable.length / 2)];
      return p - median.pointsPerDay[i];
    });
  });
  let config = {
    type: 'line',
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
  let __dirname = path.dirname(fileURLToPath(import.meta.url));
  let jsonPath = path.resolve(__dirname, 'leaderboards.json');
  let debugMode = false;
  if (jsonArr) {
    if (debugMode) {
      writeFileSync(jsonPath, JSON.stringify(jsonArr));
    }
  } else if (debugMode) {
    jsonArr = JSON.parse(readFileSync(jsonPath).toString());
  } else {
    return;
  }
  removeIgnoredDays(jsonArr);

  let members = Object.values(
    jsonArr
      .reverse()
      .map(x => x.members)
      .reduce((a, b) => ({ ...a, ...b }), {}),
  );
  let days = new Array(25).fill().map(() => [[], []]);
  members.forEach(member => {
    let name = member.name || `(anonymous user #${member.id})`;
    member.label = name;
    for (let [day, stars] of Object.entries(member.completion_day_level)) {
      let index = parseInt(day) - 1;
      if (stars['1']) {
        days[index][0].push({ name, ts: parseInt(stars['1'].get_star_ts) });
      }
      if (stars['2']) {
        days[index][1].push({ name, ts: parseInt(stars['2'].get_star_ts) });
      }
    }
  });
  let sorted = days.map(day =>
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
  let config = {
    all: calcChart(members, sorted, 1000),
    ten: calcChart(members, sorted, 10),
    five: calcChart(members, sorted, 5),
  };
  let table = [];
  let spans = [
    '<span class="leaderboard-daydesc-both">both stars</span>',
    'the <span class="leaderboard-daydesc-first">first star</span>',
  ];
  sorted.reverse().forEach((day, index) => {
    table.push('<tr style="vertical-align: top;">');
    day.forEach((stars, starIndex) => {
      table.push('<td style="padding-right: 50px;">');
      if (stars.length) {
        table.push(
          `<p>First to get ${spans[starIndex]} on Day ${25 - index}:</p>`,
        );
        stars.forEach((star, index) => {
          let paddedIndex = `${index + 1}`.padStart(
            `${stars.length}`.length,
            ' ',
          );
          table.push(
            [
              `<div class="leaderboard-entry"><span class="leaderboard-position">`,
              `${paddedIndex})</span> <span class="leaderboard-time">${star.ts}`,
              `</span> ${star.name}</div> `,
            ].join(''),
          );
        });
      }
      table.push('</td>');
    });
    table.push('</tr>');
  });
  return {
    config: JSON.stringify(config),
    table: table.join('\n'),
    chartJsUrl: imports['chart.js'],
  };
}
