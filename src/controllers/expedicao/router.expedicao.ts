import { Router, Request, Response } from 'express';

import ExpedicaoSepararEstoqueController from './expedicao.separar.estoque.controller';
import ExpedicaoItemSepararEstoqueController from './expedicao.item.separar.estoque.controller';
import ExpedicaoItemSepararacaoEstoqueController from './expedicao.item.separaracao.estoque.controller';
import ExpedicaoSetorEstoqueController from './expedicao.setor.estoque.controller';
import ExpedicaoPrioridadeDtoController from './expedicao.prioridade.controller';
import ExpedicaoMotivoRecusaController from './expedicao.motivo.recusa.controller';
import ExpedicaoTipoSolicitacaoController from './expedicao.tipo.solicitacao.controller';
import ExpedicaoTipoOperacaoExpedicaoController from './expedicao.tipo.operacao.expedicao.controller';
import ExpedicaoCarrinhoController from './expedicao.carrinho.controller';
import ExpedicaoConsultaItemEstoqueController from './expedicao.consulta.item.estoque.controller';
import ExpedicaoCarrinhoPercursoConsultaController from './expedicao.carrinho.percurso.consulta.controller';
import ExpedicaoCarrinhoPercursoController from './expedicao.carrinho.percurso.controller';
import ExpedicaoCarrinhoPercursoEstagioController from './expedicao.carrinho.percurso.estagio.controller';

export default class RouterExpedicao {
  static router = new RouterExpedicao().getRouter();
  private _router = Router();

  constructor() {
    this.index();

    this.carrinho();
    this.separarEstoque();
    this.itemSepararEstoque();
    this.itemSepararacaoEstoque();
    this.setorEstoque();
    this.prioridade();
    this.motivoRecusa();
    this.tipoSolicitacao();

    this.tipoOperacaoExpedicao();
    this.consultaItemEstoque();

    this.carrinhoPercurso();
    this.carrinhoPercursoEstagio();
    this.carrinhoPercursoConsulta();
  }

  private getRouter() {
    return this._router;
  }

  private index() {
    this._router.get('/', (req: Request, res: Response) => {
      res.send('Data7 Expedição');
    });
  }

  private carrinho() {
    this._router.get('/carrinho', ExpedicaoCarrinhoController.get);
    this._router.post('/carrinho', ExpedicaoCarrinhoController.post);
    this._router.put('/carrinho', ExpedicaoCarrinhoController.put);
    this._router.delete('/carrinho', ExpedicaoCarrinhoController.delete);
  }

  private separarEstoque() {
    this._router.get('/separar', ExpedicaoSepararEstoqueController.get);
    this._router.post('/separar', ExpedicaoSepararEstoqueController.post);
    this._router.put('/separar', ExpedicaoSepararEstoqueController.put);
    this._router.delete('/separar', ExpedicaoSepararEstoqueController.delete);
  }

  private itemSepararEstoque() {
    this._router.get('/itemseparar', ExpedicaoItemSepararEstoqueController.get);
    this._router.post('/itemseparar', ExpedicaoItemSepararEstoqueController.post);
    this._router.put('/itemseparar', ExpedicaoItemSepararEstoqueController.put);
    this._router.delete('/itemseparar', ExpedicaoItemSepararEstoqueController.delete);
  }

  private itemSepararacaoEstoque() {
    this._router.get('/itemsepararacao', ExpedicaoItemSepararacaoEstoqueController.get);
    this._router.post('/itemsepararacao', ExpedicaoItemSepararacaoEstoqueController.post);
    this._router.put('/itemsepararacao', ExpedicaoItemSepararacaoEstoqueController.put);
    this._router.delete('/itemsepararacao', ExpedicaoItemSepararacaoEstoqueController.delete);
  }

  private setorEstoque() {
    this._router.get('/setorestoque', ExpedicaoSetorEstoqueController.get);
    this._router.post('/setorestoque', ExpedicaoSetorEstoqueController.post);
    this._router.put('/setorestoque', ExpedicaoSetorEstoqueController.put);
    this._router.delete('/setorestoque', ExpedicaoSetorEstoqueController.delete);
  }

  private prioridade() {
    this._router.get('/prioridade', ExpedicaoPrioridadeDtoController.get);
    this._router.post('/prioridade', ExpedicaoPrioridadeDtoController.post);
    this._router.put('/prioridade', ExpedicaoPrioridadeDtoController.put);
    this._router.delete('/prioridade', ExpedicaoPrioridadeDtoController.delete);
  }

  private motivoRecusa() {
    this._router.get('/motivorecusa', ExpedicaoMotivoRecusaController.get);
    this._router.post('/motivorecusa', ExpedicaoMotivoRecusaController.post);
    this._router.put('/motivorecusa', ExpedicaoMotivoRecusaController.put);
    this._router.delete('/motivorecusa', ExpedicaoMotivoRecusaController.delete);
  }

  private tipoSolicitacao() {
    this._router.get('/tiposolicitacao', ExpedicaoTipoSolicitacaoController.get);
    this._router.post('/tiposolicitacao', ExpedicaoTipoSolicitacaoController.post);
    this._router.put('/tiposolicitacao', ExpedicaoTipoSolicitacaoController.put);
    this._router.delete('/tiposolicitacao', ExpedicaoTipoSolicitacaoController.delete);
  }

  private tipoOperacaoExpedicao() {
    this._router.get('/tipooperacaoexpedicao', ExpedicaoTipoOperacaoExpedicaoController.get);
    this._router.post('/tipooperacaoexpedicao', ExpedicaoTipoOperacaoExpedicaoController.post);
    this._router.put('/tipooperacaoexpedicao', ExpedicaoTipoOperacaoExpedicaoController.put);
    this._router.delete('/tipooperacaoexpedicao', ExpedicaoTipoOperacaoExpedicaoController.delete);
  }

  private consultaItemEstoque() {
    this._router.get('/consultaitemestoque', ExpedicaoConsultaItemEstoqueController.get);
    this._router.post('/consultaitemestoque', ExpedicaoConsultaItemEstoqueController.post);
    this._router.put('/consultaitemestoque', ExpedicaoConsultaItemEstoqueController.put);
    this._router.delete('/consultaitemestoque', ExpedicaoConsultaItemEstoqueController.delete);
  }

  private carrinhoPercurso() {
    this._router.get('/carrinhopercurso', ExpedicaoCarrinhoPercursoController.get);
    this._router.post('/carrinhopercurso', ExpedicaoCarrinhoPercursoController.post);
    this._router.put('/carrinhopercurso', ExpedicaoCarrinhoPercursoController.put);
    this._router.delete('/carrinhopercurso', ExpedicaoCarrinhoPercursoController.delete);
  }

  private carrinhoPercursoEstagio() {
    this._router.get('/carrinhopercursoestagio', ExpedicaoCarrinhoPercursoEstagioController.get);
    this._router.post('/carrinhopercursoestagio', ExpedicaoCarrinhoPercursoEstagioController.post);
    this._router.put('/carrinhopercursoestagio', ExpedicaoCarrinhoPercursoEstagioController.put);
    this._router.delete('/carrinhopercursoestagio', ExpedicaoCarrinhoPercursoEstagioController.delete);
  }

  private carrinhoPercursoConsulta() {
    this._router.get('/carrinhopercursoconsulta', ExpedicaoCarrinhoPercursoConsultaController.get);
    this._router.post('/carrinhopercursoconsulta', ExpedicaoCarrinhoPercursoConsultaController.post);
    this._router.put('/carrinhopercursoconsulta', ExpedicaoCarrinhoPercursoConsultaController.put);
    this._router.delete('/carrinhopercursoconsulta', ExpedicaoCarrinhoPercursoConsultaController.delete);
  }
}
