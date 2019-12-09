import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

export function calcLeaderboard(jsons) {
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  if (jsons) {
    fs.writeFileSync(
      path.resolve(__dirname, 'leaderboards.json'),
      JSON.stringify(jsons),
    );
  } else {
    jsons = JSON.parse(
      fs.readFileSync(path.resolve(__dirname, 'leaderboards.json')).toString(),
    );
  }

  const members = Object.values(
    jsons.map(x => x.members).reduce((a, b) => ({ ...a, ...b }), {}),
  );
  const days = new Array(25).fill().map(() => [[], []]);
  members.forEach(member => {
    const name = member.name || `(anonymous user #${member.id})`;
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
          ts: new Date(star.ts * 1000).toLocaleString('en-US', {
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
  const colors = ['red', 'blue', 'green', 'white', 'rgb(255, 205, 86)'];
  const config = {
    type: 'line',
    data: {
      labels: new Array(25).fill().map((x, i) => `Day ${i + 1}`),
      datasets: members
        .map(member => {
          const label = member.name || `(anonymous user #${member.id})`;
          const pointsPerDay = sorted.map(day => {
            const pointsPerStar = day.map(stars => {
              const star = stars.find(x => x.name === label);
              return star ? members.length - stars.indexOf(star) : 0;
            });
            return pointsPerStar.reduce((a, b) => a + b, 0);
          });
          const data = pointsPerDay.reduce((prev, today) => {
            if (today === 0) {
              return prev;
            } else {
              return prev.concat([
                today + (prev.length === 0 ? 0 : prev[prev.length - 1]),
              ]);
            }
          }, []);
          return {
            label,
            data,
            fill: false,
          };
        })
        .sort((a, b) => Math.max(...b.data) - Math.max(...a.data))
        // .slice(0, 10)
        .map((x, i) => ({ ...x, borderColor: colors[i % colors.length] })),
    },
  };
  let output = [''];
  output.push(
    '<script src="https://unpkg.com/chart.js@2.9.3/dist/Chart.min.js" crossorigin="anonymous"></script>',
  );
  output.push(
    [
      '<canvas id="canvas"></canvas>',
      '<script>',
      'window.onload = function() {',
      '  var ctx = document.getElementById("canvas").getContext("2d");',
      `  window.myLine = new Chart(ctx, ${JSON.stringify(config)});`,
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
