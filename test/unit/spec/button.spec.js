

import { createTest } from '../util';

import Button from '../../../src/packages/button';

describe('Button', () => {
  let comp;
  it('should create button', () => {
    comp = createTest(Button, { type: 'primary' }, true);
    let buttonElm = vm.$el;
    expect(buttonElm.classList.contains('el-button--primary')).to.be.true;
  });
});
