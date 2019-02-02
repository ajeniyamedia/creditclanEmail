import { LoanStatusTextPipe } from './loan-status-text.pipe';

describe('LoanStatusTextPipe', () => {
  it('create an instance', () => {
    const pipe = new LoanStatusTextPipe();
    expect(pipe).toBeTruthy();
  });
});
