import JSZip from 'jszip'
import FileSaver from 'file-saver'

export default function main(
  filename: string = 'download.zip',
  files: {
    content: string
    name: string
  }[],
) {
  const zip = new JSZip()
  zip.file(
    'package.json',
    JSON.stringify(
      {
        name: 'hydrazine',
        version: '1.0.0',
        main: './src/index.js',
        description: '',
        scripts: {},
        author: {
          name: 'Hydrazine',
          github: 'https://github.com/jareer12/hydrazine',
        },
        private: true,
        license: 'UNLICENSED',
      },
      null,
      4,
    ),
  )

  for (let i = 0; i < files.length; i++) {
    const file = files[i]
    zip.file(file.name, file.content)
  }

  zip.generateAsync({ type: 'blob' }).then(function (content) {
    FileSaver.saveAs(content, 'download.zip')
  })
}
