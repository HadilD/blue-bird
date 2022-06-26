
import { saveAs } from 'file-saver';

export const downloadMedia = (media) => {
    if (media && media.attachments && media.attachments.length !== 0) {
        media.attachments.forEach((i) => {
            saveAs(i["url"], media['name'] + i['id'])
        })
    }
}