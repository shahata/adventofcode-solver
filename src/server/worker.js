/* global URLPattern */
function cleanError(s) {
  return s.match(/<h1>(.*)<\/h1>/)?.[1] || s;
}

function cleanAnswer(s) {
  return s.match(/<article><p>([^.]*\.)/)?.[1] || s;
}

function cleanQuestion(s) {
  return s.match(/(?<=<p>Your puzzle answer was <code>).*?(?=<\/code>)/g) || [];
}

async function downloadContent(url, session, postPayload) {
  const headers = { Cookie: `session=${session}` };
  const options = { headers };
  if (postPayload) {
    Object.assign(options, {
      body: postPayload,
      method: "POST",
    });
    Object.assign(options.headers, {
      "content-type": "application/x-www-form-urlencoded",
    });
  }
  const response = await fetch(url, options);
  if (response.status >= 400) {
    throw new Error(
      [
        `Failed to download from ${url} (${response.status})`,
        `Description: ${cleanError(await response.text())}`,
      ].join("\n"),
    );
  }
  return response.text();
}

function getDayAnswer(year, day, session) {
  const url = `https://adventofcode.com/${+year}/day/${+day}`;
  return downloadContent(url, session).then(cleanQuestion);
}

function getDayInput(year, day, session) {
  const url = `https://adventofcode.com/${+year}/day/${+day}/input`;
  return downloadContent(url, session);
}

function submitDayAnswer(year, day, session, level, answer) {
  const url = `https://adventofcode.com/${+year}/day/${+day}/answer`;
  const postPayload = `level=${level}&answer=${encodeURIComponent(answer)}`;
  return downloadContent(url, session, postPayload).then(cleanAnswer);
}

async function respond(promise) {
  try {
    const body = await promise;
    return new Response(
      typeof body === "string" ? body : JSON.stringify(body),
      {
        status: 200,
        headers: { "Access-Control-Allow-Origin": "*" },
      },
    );
  } catch (e) {
    return new Response(e.toString(), {
      status: 500,
      headers: { "Access-Control-Allow-Origin": "*" },
    });
  }
}

export default {
  async fetch(req) {
    let match;
    const session = new URL(req.url).searchParams.get("session");
    match = new URLPattern({ pathname: "/input/:year/:day" }).exec(req.url);
    if (req.method === "GET" && match) {
      const { year, day } = match.pathname.groups;
      return respond(getDayInput(year, day, session));
    }
    match = new URLPattern({ pathname: "/answer/:year/:day" }).exec(req.url);
    if (req.method === "GET" && match) {
      const { year, day } = match.pathname.groups;
      return respond(getDayAnswer(year, day, session));
    }
    if (req.method === "POST" && match) {
      const { year, day } = match.pathname.groups;
      const formData = await req.formData();
      const level = formData.get("level");
      const answer = formData.get("answer");
      return respond(submitDayAnswer(year, day, session, level, answer));
    }
    return new Response("Not found", { status: 404 });
  },
};
