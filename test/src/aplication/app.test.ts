class ClazzDemo {
  // private test = (): string => 'Hello World!';

  constructor(private demo: any) {}
  private msg: string = 'Hello World!';

  main(): void {
    this.demo().print(this.msg);
  }
}

it('DEVE PRINTAR UMA STRING', () => {
  const demo = () => {
    const local = ' - fnAqui!';

    return {
      print: (teste: string) => console.log(teste + local),
    };
  };
  new ClazzDemo(demo).main();
});

export default {};
