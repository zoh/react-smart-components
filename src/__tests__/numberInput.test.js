import React from 'react';
import ReactDOM from 'react-dom';
import Number from 'components/NumberInput'
import {shallow, mount} from 'enzyme';

function nope() {
}

describe('Number Input (comma) component', () => {

  it('correct render', () => {
    const wrapper = mount(<Number onChange={ nope } value={0.123} />);

    expect(ReactDOM.findDOMNode(wrapper.instance()).value).toBe('0,123');
  });

  it('change', () => {
    let val = null;
    const wrapper = mount(<Number onChange={ _ => val=_ } value={0.123} />);
    wrapper.find('input').simulate('change', {target: { value : '123,12'}});

    expect(val).toBe(123.12)
  });

  it('cat by digits', () => {
    let val = null;
    const wrapper = mount(<Number digits={0} onChange={ _ => val = _ } />);
    wrapper.find('input').simulate('change', {target: { value : '123.123123'}});

    
    expect(val).toBe(123)
  })
});
