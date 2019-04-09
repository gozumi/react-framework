import './styles.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { concatIfDefined } from 'client/app/_utilities'
import * as React from 'react'
import { Subject } from 'rxjs'
import { debounceTime } from 'rxjs/operators'

interface IProps {
  className?: string
  label?: string
  value?: string | number
  type?: InputType
  hideLabel?: boolean
  disabled?: boolean
  onChange?: (value: string | number) => void
  inputClassName?: string
  labelClassName?: string
  placeholder?: string
  onConfirmChange?: () => void
  onCancelChange?: () => void
}

type InputType = 'text' | 'number' | 'date' | 'time'

/**
 * Renders the swift robin text input.
 * @param props Component properties
 */
export default function TextInput (props: IProps) {
  const cancelChange$: Subject<() => void> = new Subject()
  cancelChange$
    .pipe(debounceTime(200))
    .subscribe((cb: () => void) => cb())

  const {
    className, value, type, labelClassName, inputClassName, disabled,
    onChange, label, hideLabel, onConfirmChange, onCancelChange, placeholder
  } = props
  const componentType: InputType = type ? type : 'text'

  const handleConfirmChange = (_evt: React.MouseEvent<HTMLButtonElement>) => confirmChange(onConfirmChange)
  const handleCancelChange = (_evt: React.MouseEvent<HTMLButtonElement>) =>
    cancelChange$.next(() => onCancelChange && onCancelChange())
  const handleBlur = (_evt: React.FocusEvent<HTMLInputElement>) => {
    cancelChange$.next(() => confirmChange(onConfirmChange))
  }
  const handleKeyPress = (evt: React.KeyboardEvent<HTMLInputElement>) =>
    (evt.charCode === 13) && confirmChange(onConfirmChange)

  const baseClass = 'text-input'
  const componentClasses = disabled ? `${baseClass}` : `${baseClass} ${baseClass}--active`

  const inputClasses = concatIfDefined(['text-input__input', inputClassName])
  const renderedValue = !disabled ? renderValueAsEnabled({
    handleCancelChange,
    handleConfirmChange,
    inputClasses,
    onBlurHandler: handleBlur,
    onChangeHandler: (evt) => handleValueChange(evt, { onChange, type: componentType }),
    onKeyPressHandler: handleKeyPress,
    placeholder,
    type: componentType,
    value
  }) : renderValueAsDisabled(value, inputClassName, type)

  return (
    <div className={concatIfDefined([componentClasses, className])}>
      {!hideLabel && <label className={concatIfDefined(['text-input__label', labelClassName])}>{label}</label>}
      {renderedValue}
    </div>
  )
}

const handleValueChange = (
  evt: React.ChangeEvent<HTMLInputElement>,
  params: {
    onChange: (value: string | number) => void
    type: InputType
  }
) => {
  const { onChange, type } = params
  const { value } = evt.target
  if ((type === 'date') && !value) {
    return
  }
  if (type === 'number') {
    const newValue = isNaN(parseFloat(value)) ? null : parseFloat(value)
    onChange && onChange(newValue)
  } else {
    onChange && onChange(value)
  }
}

function confirmChange (onConfirmChange: () => void) {
  onConfirmChange && onConfirmChange()
}

function renderValueAsEnabled (
  params: {
    value: string | number,
    inputClasses: string,
    type: InputType,
    onChangeHandler: (_evt: React.ChangeEvent<HTMLInputElement>) => void,
    onBlurHandler: (_evt: React.FocusEvent<HTMLInputElement>) => void,
    onKeyPressHandler: (evt: React.KeyboardEvent<HTMLInputElement>) => void,
    handleConfirmChange: (_evt: React.MouseEvent<HTMLButtonElement>) => void,
    handleCancelChange: (_evt: React.MouseEvent<HTMLButtonElement>) => void,
    placeholder?: string
  }
) {
  const {
    value, inputClasses, type, onChangeHandler, onBlurHandler, handleConfirmChange,
    handleCancelChange, placeholder, onKeyPressHandler
  } = params

  const renderButtons = () => (
    <div className='text-input__actions'>
      <button
        className='text-input__confirm-change'
        onClick={handleConfirmChange}
      >
        <FontAwesomeIcon icon='check' />
      </button>
      <button
        className='text-input__cancel-change'
        onClick={handleCancelChange}
      >
        <FontAwesomeIcon icon='times' />
      </button>
    </div>
  )

  return (
    <div className='text-input__input-container'>
      <input
        className={inputClasses}
        type={type}
        value={value}
        onChange={onChangeHandler}
        onKeyPress={onKeyPressHandler}
        onBlur={onBlurHandler}
        placeholder={placeholder}
      />
      {((type !== 'date') && (type !== 'time')) && renderButtons()}
    </div>
  )
}

function renderValueAsDisabled (value: string | number, classes: string, type: InputType) {
  const renderDisabledValue = (v: string) => (<span className={classes}>{v}</span>)

  return renderDisabledValue(value as string)
}
