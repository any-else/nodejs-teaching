import { IStringInfo } from './../interface/stringInfo';
export function toUpCase(str: string): string {
  return str.toUpperCase();
}

export function returnTransferString<T extends IStringInfo >(str: string): IStringInfo  {
  return {
    lowerCase: str.toLowerCase(),
    upperCase: str.toUpperCase(),
    length: str.length, 
    character: Array.from(str),
    extraInfo: {}
  } as T
}
  


export class StringUtils {
  public toUpperCase(arg: string) {
    return toUpCase(arg);
  }
}