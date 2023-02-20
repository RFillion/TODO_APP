import { forwardRef } from 'react'
import Sheet from 'react-modal-sheet'

const sheet = forwardRef(function Sheets(props, ref) {
  return(
    <Sheet
        ref={ref} 
        isOpen={props.open} 
        onClose={props.close}
        snapPoints={[props.snapPoint]}
        initialSnap={0}>
        <Sheet.Container style={{background: '#0c111b'}}>
          <Sheet.Header />
          <Sheet.Content>
            {props.children}
          </Sheet.Content>
        </Sheet.Container>
        <Sheet.Backdrop />
      </Sheet>
  )
})

export default sheet