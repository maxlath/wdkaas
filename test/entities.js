require('should')
const { get, undesiredRes, undesiredErr } = require('./lib/utils')

describe('entity', () => {
  xit('should return a simplified entity from an id', done => {
    get('/entities?ids=Q80')
    .then(res => {
      const { body, statusCode } = res
      statusCode.should.equal(200)
      const { Q80 } = body
      Q80.id.should.equal('Q80')
      Q80.labels.en.should.equal('Tim Berners-Lee')
      Q80.descriptions.en.should.be.a.String()
      Q80.aliases.en.should.be.an.Array()
      Q80.aliases.en[0].should.be.a.String()
      Q80.claims.should.be.an.Object()
      Q80.claims.P31[0].should.equal('Q5')
      Q80.sitelinks.should.be.an.Object()
      Q80.sitelinks.enwiki.should.equal('Tim Berners-Lee')
      done()
    })
    .catch(undesiredErr(done))
  })

  xit('should return a simplified entity from a title', done => {
    get('/entities?titles=Tim%20Berners-Lee&sites=frwiki')
    .then(res => {
      const { body, statusCode } = res
      statusCode.should.equal(200)
      const { Q80 } = body
      Q80.id.should.equal('Q80')
      Q80.labels.en.should.equal('Tim Berners-Lee')
      Q80.descriptions.en.should.be.a.String()
      Q80.aliases.en.should.be.an.Array()
      Q80.aliases.en[0].should.be.a.String()
      Q80.claims.should.be.an.Object()
      Q80.claims.P31[0].should.equal('Q5')
      Q80.sitelinks.should.be.an.Object()
      Q80.sitelinks.enwiki.should.equal('Tim Berners-Lee')
      done()
    })
    .catch(undesiredErr(done))
  })

  it('should pass simplification options', done => {
    get('/entities?ids=Q137869&keep-qualifiers=true&entity-prefix=wd&add-url=true')
    .then(res => {
      const { body, statusCode } = res
      statusCode.should.equal(200)
      const { Q137869 } = body
      Q137869.claims.P31[0].should.be.an.Object()
      Q137869.claims.P179[0].qualifiers.P155[0].should.equal('wd:Q1212773')
      Q137869.sitelinks.frwiki.url.should.equal('https://fr.wikipedia.org/wiki/Germinal_%28roman%29')
      done()
    })
    .catch(undesiredErr(done))
  })
})
