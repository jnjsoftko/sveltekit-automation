import yaml from 'js-yaml';

const yamlFromObject = (obj) => {
  try {
    // console.log(`obj: ${obj}`)
    for (const [key, value] of Object.entries(obj)) {
    //   console.log(`value: ${value}`)
      obj[key] = value instanceof String && !value.includes("\n") && /[^0-9,]/.test(value) ? `"${value}"` : value;
    }
    const yamlStr = yaml.dump(obj).replaceAll(`'"`, `"`).replaceAll(`"'`, `"`);
    // console.log(yamlStr);
    return yamlStr;
  } catch (e) {
    console.error('YAML 변환 중 오류 발생:', e);
  }
}

const sanitizeFilename = (filename, to = "_") => {
    return filename.replace(/[\<\>:"/|?*]/g, to);
}

const srtFromCaptions = (captions) => {
    return captions.map((caption, index) => {
        const start = parseFloat(caption.start);
        const end = start + parseFloat(caption.dur);
        const startTime = new Date(start * 1000).toISOString().substr(11, 12);
        const endTime = new Date(end * 1000).toISOString().substr(11, 12);

        return `${index + 1}\n${startTime.replace('.', ',')} --> ${endTime.replace('.', ',')}\n${caption.text}\n`;
    }).join('\n');
}

const txtFromCaptions = (captions) => {
    return captions.map((caption) => `${caption.text}`).join('\n');
}

const stripThumbnailUrl = (url) => {
    /*
      "thumbnail": "=image(\"https://i.ytimg.com/vi/k_p5h4Tf0ZM/hqdefault.jpg\")",
      =>
      "thumbnail": "https://i.ytimg.com/vi/k_p5h4Tf0ZM/hqdefault.jpg",
      */
    const regex = /=image\("(.+?)"\)/;
    const found = url.match(regex);
    return found ? found[1] : url;
  };

export { yamlFromObject, sanitizeFilename, srtFromCaptions, txtFromCaptions, stripThumbnailUrl }

