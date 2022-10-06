import LocalSybaseDemoRepository from '../../../src/repository/local.sybase.demo.repository';
import DemoDto from '../../../src/dto/demo.digital.dto';

describe('CRUD DEMO SYBASE', () => {
  const newEntity = new DemoDto({ id: 1, nome: 'DEMO' });
  const upEntity = new DemoDto({ id: 1, nome: 'DEMO 2' });

  it('deve inserir uma novo resitro', async () => {
    const repo = new LocalSybaseDemoRepository();
    await repo.insert(newEntity);
  });

  it('deve ler registro gravado', async () => {
    const repo = new LocalSybaseDemoRepository();
    const entity = await repo.selectWhere([{ key: 'ID', value: 1 }]);
    expect(entity?.length).toBe(1);
    expect(entity?.[0].nome).toBe(newEntity.nome);
  });

  it('deve atualizar registro gravado', async () => {
    const repo = new LocalSybaseDemoRepository();
    const params = [{ key: 'ID', value: 1 }];
    const result = await repo.update(upEntity);
    const entity = await repo.selectWhere(params);
    expect(entity?.length).toBe(1);
    expect(entity?.[0].nome).toBe(upEntity.nome);
  });

  it('deve deletar registro gravado', async () => {
    const repo = new LocalSybaseDemoRepository();
    const params = [{ key: 'ID', value: 1 }];
    const result = await repo.delete(newEntity);
    const entity = await repo.selectWhere(params);
    expect(entity).toBe(undefined);
  });
});

export default {};
