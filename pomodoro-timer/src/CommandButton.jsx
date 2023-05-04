export default function CommandButton({id, verse, click}) {
  return(
  <button id={id} verse={verse} onClick={click}><ion-icon name={verse ? "add-outline" : "remove-outline"}></ion-icon></button>
  )
}