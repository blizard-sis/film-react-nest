import { TskvLogger } from './tskv.logger';

describe('TskvLogger', () => {
  let logger: TskvLogger;

  beforeEach(() => {
    logger = new TskvLogger();
  });

  describe('format', () => {
    it('should format log as TSKV string', () => {
      const result = (logger as any).format('log', 'test message', { foo: 1 });
      expect(result).toMatch(/^time=/);
      expect(result).toContain('level=log');
      expect(result).toContain('message=test message');
      expect(result).toContain('param0={"foo":1}');
    });
  });

  describe('log methods', () => {
    let spy: jest.SpyInstance;

    afterEach(() => {
      spy.mockRestore();
    });

    it('should call console.log with formatted message', () => {
      spy = jest.spyOn(console, 'log').mockImplementation(() => {});
      logger.log('logger message');
      expect(spy).toHaveBeenCalledWith(
        expect.stringContaining('message=logger message'),
      );
    });

    it('should call console.error with formatted message', () => {
      spy = jest.spyOn(console, 'error').mockImplementation(() => {});
      logger.error('error message');
      expect(spy).toHaveBeenCalledWith(
        expect.stringContaining('message=error message'),
      );
    });

    it('should call console.warn with formatted message', () => {
      spy = jest.spyOn(console, 'warn').mockImplementation(() => {});
      logger.warn('warning message');
      expect(spy).toHaveBeenCalledWith(
        expect.stringContaining('message=warning message'),
      );
    });

    it('should call console.debug with formatted message', () => {
      spy = jest.spyOn(console, 'debug').mockImplementation(() => {});
      logger.debug?.('debug message');
      expect(spy).toHaveBeenCalledWith(
        expect.stringContaining('message=debug message'),
      );
    });

    it('should call console.log with formatted verbose message', () => {
      spy = jest.spyOn(console, 'log').mockImplementation(() => {});
      logger.verbose?.('verbose message');
      expect(spy).toHaveBeenCalledWith(
        expect.stringContaining('message=verbose message'),
      );
    });
  });
});
