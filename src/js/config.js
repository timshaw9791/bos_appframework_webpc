var baseURL = 'http://192.168.1.44:8010/warehouse';

if (process.env.NODE_ENV == "production") {
  let fs = window.require('fs'), result
  result = fs.readFileSync(path).toString();
  result = eval(`(${result})`);
  baseURL = `http://${result.HOUSE_SERVER}`;
}

export const imgBaseUrl = `${baseURL}/images/`;
export const pdfBaseUrl = `${baseURL}/pdfs/`;
export const videoBaseUrl = `${baseURL}/videos/`;

export const imgUpUrl = `${baseURL}/upload/image`;
export const pdfUpUrl = `${baseURL}/upload/pdf`;
export const videoUpUrl = `${baseURL}/upload/video`;