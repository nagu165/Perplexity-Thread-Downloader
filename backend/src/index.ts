import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Download from './models/Download';
import PDFDocument from 'pdfkit';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URL as string)
.then(() => console.log('Connected to Database'))
.catch((err) => console.error("Couldn't connect to Database: ",err))

app.post('api/threads/modify', async(req, res) => {
    try{
        const {title, url, content, timestamp} = req.body();

        const doc = new PDFDocument();
        res.setHeader('Content-type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename=perplexity-thread.pdf`);

        doc.pipe(res);

        doc.fontSize(20).text(title, { align: 'center' });
        doc.moveDown();
        doc.fontSize(12).text(`Downloaded on: ${new Date().toLocaleString()}`, { align: 'center' });
    } catch (error) {
        console.error('Error creating pdf:', error)
        res.status(500).json({ error: 'Failed to create PDF' });
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});