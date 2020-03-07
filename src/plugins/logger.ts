const BASE_STYLES = `
  color: white;
  font-weight: 800;
  padding: 2px 5px 2px 5px;
`;

const PREFIX_STYLE_STRING = `
  ${BASE_STYLES}
  background: #7F7EFF;
  border-radius: 50px 0 0 50px
`;

const CLEAR_STYLE_STRING = `
  background: transparent;
  font-weight: 400;
`;

const INFO_STYLE_STRING = `
  ${BASE_STYLES}
  background-image: linear-gradient(19deg, #FBDA61 0%, #FF5ACD 100%);
  border-radius: 0 50px 50px 0;
  `;

const EVENT_STYLE_STRING = `
  ${BASE_STYLES}
  background-color: #08AEEA;
  background-image: linear-gradient(19deg, #08AEEA 0%, #2AF598 100%);
  border-radius: 0 50px 50px 0;
  `;

const REQ_STYLE_STRING = `
  ${BASE_STYLES}
  background-image: linear-gradient(19deg, #EA7AF4 0%, #6200B3 100%);
  background-color: #FBDA61;
  border-radius: 0 0.0 0;
`;

const WARN_STYLE_STRING = `
  ${BASE_STYLES}
  color: #B7972F;
  background-color: #FBDA61;
  background-image: linear-gradient(19deg, #FFF052 0%, #EDD892 100%);
  border-radius: 0 50px 50px 0;
`;

const ERROR_STYLE_STRING = `
  ${BASE_STYLES}
  color: white;
  background-color: #FBDA61;
  background-image: linear-gradient(19deg, #E64055 0%, #BC1900 100%);
  border-radius: 0 0 0 0;
`;

const ERROR_PARAMS_STYLE_STRING = `
  ${BASE_STYLES}
  color: white;
  background-color: #FBDA61;
  background-image: linear-gradient(19deg, rgba(183,185,117,1) 0%, rgba(115,136,0,1) 100%);
  border-radius: 0 50px 50px 0;
`;

const REQ_PARAMS_STYLE_STRING = `
  ${BASE_STYLES}
  color: white;
  background-color: #FBDA61;
  background-image: linear-gradient(19deg, rgba(117,185,129,1) 0%, rgba(148,175,0,1) 100%);
  border-radius: 0 50px 50px 0;
`;

class NestLogger {
  private prefix = "";
  private debug = false;

  constructor() {
    this.prefix = "EA API";
    this.debug = process.env.VUE_APP_ENV !== "production";
  }

  public install(Vue: any) {
    Vue.prototype.$log = this;
  }

  error(text: string, response: any) {
    const { status, statusText, config } = response;
    const paramsResponse = JSON.stringify(response, null, 1);

    if (this.debug) {
      window.console.groupCollapsed(
        `%c${this.prefix}%cError%c ${config.method.toUpperCase()} : ${
          config.url
        } : ${status} : ${statusText}`,
        PREFIX_STYLE_STRING,
        ERROR_STYLE_STRING,
        ERROR_PARAMS_STYLE_STRING
      );
      window.console.error(paramsResponse);
      window.console.groupEnd();
    }
    return text;
  }

  info(text: string) {
    if (this.debug) {
      window.console.info(
        `%c${this.prefix}%cInfo%c ${text}`,
        PREFIX_STYLE_STRING,
        INFO_STYLE_STRING,
        CLEAR_STYLE_STRING
      );
    }
    return text;
  }

  warn(text: string) {
    if (this.debug) {
      window.console.group(
        `%c${this.prefix}%cWarning%c`,
        PREFIX_STYLE_STRING,
        WARN_STYLE_STRING,
        CLEAR_STYLE_STRING
      );
      window.console.warn(text);
      window.console.groupEnd();
    }
    return text;
  }

  event(text: string) {
    if (this.debug) {
      window.console.info(
        `%c${this.prefix}%cEvent%c ${text}`,
        PREFIX_STYLE_STRING,
        EVENT_STYLE_STRING,
        CLEAR_STYLE_STRING
      );
    }
    return text;
  }

  request(params: any) {
    const paramsString = JSON.stringify(params, null, 1);
    if (this.debug) {
      window.console.groupCollapsed(
        `%c${this.prefix}%cRequest%c ${params.method.toUpperCase()} : ${
          params.url
        }`,
        PREFIX_STYLE_STRING,
        REQ_STYLE_STRING,
        REQ_PARAMS_STYLE_STRING
      );
      window.console.info(paramsString);
      window.console.groupEnd();
    }
    return paramsString;
  }
}

export default new NestLogger();
