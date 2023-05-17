import imagemin from 'imagemin';
import imageminWebp from 'imagemin-webp';
import glob from 'glob';
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const inputFolder = './viking-icons';
const outputFolder = './viking-icons-48px';

// image-min плохо конвертирует в webp, sharp делает итоговый размер файл вдвое меньге при идентичном качестве

// Ниже переменная которя создаст имена файлов вида 1-кол-во файлов
const numNames = true

// Создаем папку, если она не существует
if (!fs.existsSync(outputFolder)) {
	fs.mkdirSync(outputFolder);
} else {
	fs.rmSync(outputFolder, { recursive: true });
	fs.mkdirSync(outputFolder);
}

// перекодируем png в webp и обрезаем до нужного разрешения с использованием sharp без image-min
const files = glob.sync(`${inputFolder}/*.png`);
let counter = 1
for (const file of files) {
	const fileName = path.basename(file).replace(/\.png$/, '');
	const outputPath = path.join(outputFolder, `${numNames ? counter : fileName}.webp`);

	const data = await sharp(file)
		.webp({ lossless: true, effort: 6 })
		// .webp({ quality: 100, effort: 6 })
		.resize(48, 48)
		.toFile(outputPath);
	counter++
}
console.log('Images converted and resized');



/* Тесты режимов на разных файлах
Оригин папка 1.65 МБ
После конфертации в webp(lossless) 748 Кб
Сначала конфертация в webp потом resize до 64х64 размер папки 191 Кб
Сначала конфертация в webp потом resize до 48х48 размер папки 147 Кб
Сначала конфертация в webp потом resize до 32х32 размер папки 77.8 Кб

Режим quality: 100 делает качество выходных файлов хуже чем lossless: true по цветам
lossless: true для 48px 147 Кб
quality: 100 для 48px 118 Кб

lossless: true для 512px 748 Кб
quality: 100 для 512px 1.24 Мб(конвертировалось раз в 5 дольше обычного)
 такое ощущение что для quality: 100 не работает effort: 6
 
 
Тесты сжатия на фото, фотки в jpeg
3 фотки в сумме 12.4 Мб
lossless: true в сумме 15.7 Мб
quality: 100 в сумме 7.48 Мб(качество по сравнению с оригиналом идентичное)

Итого выводы такие:
 иногда lossless: true дает лучше результат, на иконках png он показал себя лучше по качеству, но и размер файла выше
 иногда quality: 100 дает лучший результат, он показал себя значительно улчше на полноценных фото в jpeg
*/




// (async () => {
// 	const files = glob.sync(`${inputFolder}/*.png`);
// 	console.log(files);
// 	sharp.cache(false);
// 	for (const file of files) {
// 		await sharp(file)
// 			.resize(64, 64)
// 			.toFile(`${outputFolder}/${file.replace(/^.*[\\/]/, '')}.webp`);
// 	}

// 	await imagemin([`${outputFolder}/*.webp`], {
// 		destination: outputFolder,
// 		plugins: [imageminWebp({ quality: 100 })],
// 	});

// 	console.log('Images converted to WebP');
// })();


// ниже код который просто перекодирует в webp без измененния размера
// (async () => {
// 	const files = glob.sync(`${inputFolder}/*.png`);
// 	await imagemin(files, {
// 		destination: outputFolder,
// 		plugins: [imageminWebp({ quality: 100 })],
// 	});
// 	console.log('Images converted to WebP');

// 	const webpFiles = glob.sync(`${outputFolder}/*.webp`);
// 	for (const file of webpFiles) {
// 		await sharp(file)
// 			.resize(64, 64)
// 			.toFile(`${outputFolder}/${file.replace(/^.*[\\/]/, '')}.webp`);
// 			// .toFile(`${file}`);
// 	}
// 	// console.log('webpFiles', webpFiles);
// 	console.log('Images resized');
// })();


