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
  border-radius: 0 50px 50px 0;
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

class NestLogger {
  private prefix = "";
  constructor() {
    this.prefix = "EA API";
  }
  public install(Vue: any) {
    Vue.prototype.$log = this;
  }

  error(text: string, response: any) {
    console.log("text", text);
    const { status, statusText, config } = response;
    const paramsResponse = JSON.stringify(response, null, 1);

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
    return text;
  }
}

export default new NestLogger();
