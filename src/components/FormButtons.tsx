import { useContext } from 'react'
import { DrillContext } from '../App'

export function FormButtons ({ disableSubmit, handleClear }: { disableSubmit: boolean, handleClear: () => void }): JSX.Element {
  const drill = useContext(DrillContext)

  const handleClick = (e: any): void => {
    handleClear()
    e.currentTarget.blur()
  }

  return (
    <>
      <div className="col-span-2 mt-4 grid grid-cols-[60%_auto] gap-3">
        <button data-testid='submit' className="flex items-center place-content-evenly bg-neutral-700 enabled:hover:bg-neutral-300 enabled:hover:text-neutral-900 enabled:hover:font-bold enabled:focus:bg-neutral-300 enabled:focus:text-neutral-900 enabled:focus:font-bold" type='submit' disabled={disableSubmit}>
          <span className="material-symbols-rounded">post_add</span> Submit
        </button>
        <button data-testid='clear' className="flex items-center place-content-evenly bg-neutral-900 hover:bg-red-900 hover:font-bold focus:bg-red-900 focus:font-bold" onClick={handleClick} type="button">
          <span className="material-symbols-rounded">backspace</span> Clear
        </button>
        <h3 className="col-span-2 text-xs text-right font-raleway ">{drill}</h3>
      </div>
    </>
  )
}
