import Vue from 'vue'
import 'babel-polyfill'

import EstimationsList from 'src/components/EstimationsList'
import store from 'src/vuex/store'


function render(estimations) {
  store.state.estimations = estimations
  const Component = Vue.extend({ ...EstimationsList, store })
  let rendered = new Component().$mount()
  return rendered.$el
}

describe('EstimationsList.vue', () => {
  it('should render blankslate if nothing is there', () => {
    let list = render([])
    expect(list.querySelector('.blankslate').textContent).to.have.string('a blank slate')
  })
})
