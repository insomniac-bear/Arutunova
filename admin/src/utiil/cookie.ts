/* eslint-disable no-useless-escape */
interface ICookiesProps {
  [name: string]: string | number | boolean | Date | undefined;
  expires?: Date | number | string;
}

export const setCookie = (name: string, value: string, props: ICookiesProps = {}): void => {
  let exp = props.expires;
  if (typeof exp === 'number' && exp !== undefined) {
    const d = new Date();
    d.setTime(d.getTime() + exp * 1000);
    exp = props.expires = d;
  }
  if (exp instanceof Date && exp.toUTCString !== undefined) {
    props.expires = exp.toUTCString();
  }
  value = encodeURIComponent(value);
  let updatedCookie = name + '=' + value + ';path=/';
  for (const propName in props) {
    updatedCookie += '; ' + propName;
    const propValue = props[propName];
    if (propValue !== true) {
      updatedCookie = `${updatedCookie}=${String(propValue)}`;
    }
  }
  document.cookie = updatedCookie;
};

export function getCookie (name: string): string | undefined {
  const matches = document.cookie.match(
    new RegExp(
      '(?:^|; )' +
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') +
        '=([^;]*)'
    )
  );
  return matches !== null ? decodeURIComponent(matches[1]) : undefined;
}
