// plunk.d.ts
declare module "@plunk/node" {
  export default class Plunk {
    constructor(apiKey: string);
    emails: {
      send: (options: {
        to: string;
        subject: string;
        body: string;
      }) => Promise<any>;
    };
  }
}
