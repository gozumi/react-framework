import i18next from 'i18next'

const options = {
  debug: false,
  lng: navigator.language,
  resources: {
    en: {
      translation: {
        home: {
          header: 'Home Page Header'
        }
      }
    }
  }
}

export default () => i18next.init(options)
