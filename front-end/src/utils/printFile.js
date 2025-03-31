export function printFile(file, Set) {
    const reader = new FileReader();
    reader.onload = (evt) => {
        Set(evt.target.result);
    };
    reader.readAsDataURL(file);
}