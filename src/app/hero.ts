
// 定義 2 個以上的 interface
export interface _Hero {
  id :number;
  name :string;
}


export interface Hero {
  id :number;
  year :number;
  prono:string;
  name :string;
  finqty:number;
  usedqty:number;
}

export class fHero {

  constructor(
    public id :number,
    public name:string,
    public power:string,
    public alterEgo?:string

  ) {}
}
