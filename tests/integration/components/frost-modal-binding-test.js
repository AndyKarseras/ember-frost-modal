import {expect} from 'chai'
import {$hook, initialize} from 'ember-hook'
import {beforeEach, describe, it} from 'mocha'
import hbs from 'htmlbars-inline-precompile'

import {integration} from 'dummy/tests/helpers/ember-test-utils/setup-component-test'

const test = integration('frost-modal-binding')
describe(test.label, function () {
  test.setup()

  beforeEach(function () {
    initialize()
  })

  it('renders', function () {
    this.set('isModalVisible', false)
    this.set('actions', {
      closeModal () {
        this.set('isModalVisible', false)
      }
    })

    this.render(hbs`
      {{frost-modal-outlet
        name='basic'
      }}

      {{frost-modal-binding 'basic-modal'
        classModifier='custom-class'
        closeOnOutsideClick=true
        hook='basic'
        isVisible=isModalVisible
        targetOutlet='basic'
        onClose=(action 'closeModal')
      }}
    `)

    expect($hook('basic-modal'), 'Modal is initially hidden')
      .to.have.length(0)

    this.set('isModalVisible', true)
    expect($hook('basic-modal'), 'Modal becomes visible')
      .to.have.length(1)

    expect(this.$('.frost-modal-outlet-background').hasClass('custom-class'),
      'has class modifier').to.be.true
    expect(this.$('.frost-modal-outlet-container').hasClass('custom-class'),
      'has class modifier').to.be.true
    expect(this.$('.frost-modal-outlet-body').hasClass('custom-class'),
      'has class modifier').to.be.true

    $hook('basic-modal-confirm').click()
    expect($hook('basic-modal'), 'Modal is dismissed')
      .to.have.length(0)
  })
})
