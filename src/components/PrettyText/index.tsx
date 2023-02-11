import xss from 'xss'

const toPrettyText = (text: string, p: boolean = true) => {
  let result = !text
    ? ''
    : text
        .replace(/^\n*/, '') // Выпиливаем переносы строки из начала
        .replace(/\n*$/, '\n\n') // Выпиливаем переносы из конца и добавляем 2 в конец, чтобы удобно было оборачивать в <p>
        .replace(/\n\n\n+/g, '\n\n') // Заменяем все \n встречающиесе более 2 раз подряд, на двойные \n
        .replace(/([^\n])\n([^\n])/g, '$1<br>$2') // Преваращаем одиночные переносы в <br>
  if (p) {
    result = result.replace(/([^\n]*)\n\n/g, '<p>$1</p>') // Обрачиваем всё между двойными переносами в <p></p>
  } else {
    result = result.replace(/([^\n]*)\n\n/g, '$1<br>') // Заменяем все двойные переносы на <br/>
  }
  return xss(result)
}

export const PrettyText = ({ text, p }: { text: string; p?: boolean }) => {
  return <div dangerouslySetInnerHTML={{ __html: toPrettyText(text, p) }} />
}
