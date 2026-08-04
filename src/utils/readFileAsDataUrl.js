// Wraps FileReader in a promise so components can `await` an image file's
// data URL instead of juggling onload/onerror callbacks.
export function readFileAsDataUrl(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = () => reject(reader.error);
        reader.readAsDataURL(file);
    });
}
