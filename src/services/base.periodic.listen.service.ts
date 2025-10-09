import PeriodicListenContract from '../contracts/periodic.listen.contract';

export default abstract class BasePeriodicListenService implements PeriodicListenContract {
  private interval: NodeJS.Timeout | null = null;
  private running: boolean = false;
  private paused: boolean = false;
  protected intervalTime: number;

  constructor(intervalTime: number = 8000) {
    this.intervalTime = intervalTime;
  }

  /**
   * Método abstrato que deve ser implementado pelas subclasses
   * para definir o comportamento específico de emissão de dados
   */
  protected abstract emitData(): Promise<void>;

  /**
   * Inicia o listener periódico
   */
  public start(): void {
    if (this.running) {
      console.log(`[${this.constructor.name}] Já está em execução`);
      return;
    }

    this.running = true;
    this.paused = false;

    // Executa imediatamente na primeira vez
    this.executeEmit();

    // Configura intervalo
    this.interval = setInterval(() => {
      if (!this.paused) {
        this.executeEmit();
      }
    }, this.intervalTime);

    console.log(`[${this.constructor.name}] Iniciado com intervalo de ${this.intervalTime}ms`);
  }

  /**
   * Para o listener periódico e limpa o intervalo
   */
  public stop(): void {
    if (!this.running) {
      console.log(`[${this.constructor.name}] Não está em execução`);
      return;
    }

    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }

    this.running = false;
    this.paused = false;

    console.log(`[${this.constructor.name}] Parado`);
  }

  /**
   * Pausa as emissões sem parar o timer
   */
  public pause(): void {
    if (!this.running) {
      console.log(`[${this.constructor.name}] Não está em execução`);
      return;
    }

    if (this.paused) {
      console.log(`[${this.constructor.name}] Já está pausado`);
      return;
    }

    this.paused = true;
    console.log(`[${this.constructor.name}] Pausado`);
  }

  /**
   * Retoma as emissões
   */
  public resume(): void {
    if (!this.running) {
      console.log(`[${this.constructor.name}] Não está em execução`);
      return;
    }

    if (!this.paused) {
      console.log(`[${this.constructor.name}] Não está pausado`);
      return;
    }

    this.paused = false;
    console.log(`[${this.constructor.name}] Retomado`);
  }

  /**
   * Verifica se está em execução
   */
  public isRunning(): boolean {
    return this.running;
  }

  /**
   * Verifica se está pausado
   */
  public isPaused(): boolean {
    return this.paused;
  }

  /**
   * Implementa o contrato ListenContract
   */
  public listen(): void {
    this.start();
  }

  /**
   * Executa a emissão com tratamento de erros
   */
  private async executeEmit(): Promise<void> {
    try {
      await this.emitData();
    } catch (error: any) {
      console.error(`[${this.constructor.name}] Erro ao emitir dados:`, error.message);
      // Não interrompe o timer, apenas loga o erro
    }
  }
}

