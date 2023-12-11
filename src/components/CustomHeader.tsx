export function CustomHeader ({ subtitle }: { subtitle: string }): JSX.Element {
  return (
    <header className="flex flex-col items-center justify-center">
      <img className="w-1/3 4k:w-1/2" src="/logo.png"></img>
      <h1 className="m-4 text-5xl font-bold font-anton">MinesweepeReact</h1>
      <h2 data-testid='subtitle' className="mb-10 text-md font-raleway">{subtitle}</h2>
    </header>
  )
}
