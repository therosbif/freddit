import { SUCCESS } from "../api/constants";

export default class Listing {
  constructor(cb, subreddit, token, limit = 25) {
    this.cb = cb;
    this.before = [];
    this.after = "";
    this.counts = [];
    this.count = 0;
    this.limit = limit;
    this.subreddit = subreddit;
    this.token = token;
  }

  async init(extraArgs = {}) {
    const args = { limit: this.limit, count: 0, subreddit: this.subreddit, token: this.token, ...extraArgs }

    return new Promise((resolve, reject) => this.cb(args)
      .then(async (res) => {
        const json = await res.json();

        this.after = json.data.after;
        this.count = json.data.dist;
        return resolve(json.data.children);
      }).catch((err) => {
        console.log(err);
        return reject('An error occured');
      })
    )
  }

  async next(extraArgs = {}) {
    const args = { limit: this.limit, after: this.after, count: this.count, subreddit: this.subreddit, token: this.token, ...extraArgs }

    return new Promise((resolve, reject) => this.cb(args)
      .then(async (res) => {
        const json = await res.json();

        this.after = json.data.after;
        this.before.push(json.data.before);
        if (this.count > 0) {
          this.counts.push(this.count);
        }
        this.count = json.data.dist;
        return resolve(json.data.children);
      }).catch((err) => {
        console.log(err);
        return reject('An error occured');
      })
    )
  }

  async prev(extraArgs = {}) {
    const args = { limit: this.limit, before: this.before[this.before.length - 1], count: this.count, subreddit: this.subreddit, token: this.token, ...extraArgs }

    return new Promise((resolve, reject) => this.cb(args)
      .then(async (res) => {
        const json = await res.json();

        this.after = json.data.after;
        this.count = this.counts.pop();
        this.before.pop();
        this.before.push(json.data.before);
        return resolve(json.data.children);
      }).catch((err) => {
        console.log(err);
        return reject('An error occured');
      })
    )
  }
}
