import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faBars,
  faCheck,
  faChevronDown,
  faChevronUp,
  faPen,
  faPlus,
  faTimes,
  faUser
} from '@fortawesome/free-solid-svg-icons'

// Add fontawesome icons to the project
// FIXME: This is needed to overcome a typing issue with fontawesome
const typedLibrary: any = library
typedLibrary.add(faCheck)
typedLibrary.add(faTimes)
typedLibrary.add(faBars)
typedLibrary.add(faPlus)
typedLibrary.add(faUser)
typedLibrary.add(faPen)
typedLibrary.add(faChevronUp)
typedLibrary.add(faChevronDown)
