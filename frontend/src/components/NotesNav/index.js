import { useSelector } from "react-redux";


function NotesNav () {
    const selector = useSelector(state => state.notes);

}

export default NotesNav;