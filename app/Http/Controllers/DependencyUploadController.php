<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Pion\Laravel\ChunkUpload\Exceptions\UploadMissingFileException;
use Pion\Laravel\ChunkUpload\Handler\AbstractHandler;
use Pion\Laravel\ChunkUpload\Handler\HandlerFactory;
use Pion\Laravel\ChunkUpload\Receiver\FileReceiver;

class DependencyUploadController extends UploadController
{
    /**
     * Handles the file upload
     *
     * @param FileReceiver $receiver
     *
     * @return \Illuminate\Http\JsonResponse
     *
     * @throws UploadMissingFileException
     *
     */
    public function uploadFile(FileReceiver $receiver) {

        // check if the upload is success
        if ($receiver->isUploaded()) {

            // receive the file
            $save = $receiver->receive();

            // check if the upload has finished (in chunk mode it will send smaller files)
            if ($save->isFinished()) {
                // save the file and return any response you need
                return $this->saveFile($save->getFile());
            } else {
                // we are in chunk mode, lets send the current progress

                /** @var AbstractHandler $handler */
                $handler = $save->handler();

                return response()->json([
                    "done" => $handler->getPercentageDone(),
                ]);
            }
        } else {
            throw new UploadMissingFileException();
        }
    }
}