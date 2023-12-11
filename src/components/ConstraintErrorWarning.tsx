import React from 'react'

export function ConstraintErrorWarning ({ constraintError }: { constraintError: string[] }): JSX.Element {
  return (
    <>
      {
        constraintError.length !== 0 &&
                <div className="fixed bottom-0 z-50 w-2/5 pointer-events-none css-constraint-div" >
                  <section className="p-2 font-extrabold w-max rounded-t-md font-raleway bg-neutral-500">CONSTRAINT ERROR</section>
                  <section className="p-3 text-center bg-red-900 border-2 border-b-4 border-red-500 rounded-md rounded-tl-none pointer-events-auto font-raleway">
                    {constraintError.map((element: string) => (
                      <React.Fragment key={element}>
                        <p className="font-bold">
                          <span className="font-emoji">⚠️ </span>
                          <span data-testid='constraintError'>{element}</span>
                        </p>
                      </React.Fragment>

                    ))}
                  </section>
                </div>
      }
    </>
  )
}
