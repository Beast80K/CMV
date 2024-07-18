import parse from 'html-react-parser';
const ToHTML = (HTML) => {
    try {
        return parse(HTML)
    } catch (e) {
        return HTML
    }
}

export default ToHTML