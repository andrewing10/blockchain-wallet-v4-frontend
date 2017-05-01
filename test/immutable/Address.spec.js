import { expect } from 'chai'
import * as R from 'ramda'

import Address, * as AddressUtil from '../../src/immutable/Address'
import * as crypto from '../../src/WalletCrypto'

describe('Address', () => {
  const addressFixture = { priv: '5priv', addr: '1addr' }
  const address = new Address(addressFixture)

  crypto.encryptSecPass = R.curry((sk, iter, pw, str) => `enc<${str}>`)

  describe('toJS', () => {
    it('should return the correct object', () => {
      expect(AddressUtil.toJS(address)).to.deep.equal(addressFixture)
    })
  })

  describe('properties', () => {
    it('should have priv', () => {
      expect(address.priv).to.equal(addressFixture.priv)
    })

    it('should have addr', () => {
      expect(address.addr).to.equal(addressFixture.addr)
    })
  })

  describe('setLabel', () => {
    it('should set the label of an address object', () => {
      let withNewLabel = AddressUtil.setLabel('new_label', address)
      expect(address.label).to.equal(void 0)
      expect(withNewLabel.label).to.equal('new_label')
    })
  })

  describe('encrypt', () => {
    it('should return an encrypted Address', () => {
      let encrypted = AddressUtil.encrypt(1, null, 'secret', address)
      expect(encrypted.priv).to.equal('enc<5priv>')
    })
  })
})
