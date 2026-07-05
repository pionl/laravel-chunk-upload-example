<?php

namespace Pion\Laravel\ChunkUploadExample\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Pion\Laravel\ChunkUpload\Exceptions\UploadMissingFileException;
use Pion\Laravel\ChunkUpload\Handler\AbstractHandler;
use Pion\Laravel\ChunkUpload\Receiver\FileReceiver;
use Psr\Log\LoggerInterface;

class DependencyUploadController extends UploadController
{
    /**
     * Handles the file upload
     * @throws UploadMissingFileException
     *
     */
    public function uploadFile(FileReceiver $receiver, Request $request, LoggerInterface $logger): JsonResponse
    {
        $this->logUploadRequest($request, $logger, 'chunk-upload.controller.request-received');

        // check if the upload is success, throw exception or return response you need
        if ($receiver->isUploaded() === false) {
            throw new UploadMissingFileException();
        }
        // receive the file
        $save = $receiver->receive();

        // check if the upload has finished (in chunk mode it will send smaller files)
        if ($save->isFinished()) {
            $this->logUploadRequest($request, $logger, 'chunk-upload.controller.upload-finished', [
                'is_finished' => true,
                'handler' => get_class($save->handler()),
            ]);
            // save the file and return any response you need
            return $this->saveFile($save->getFile());
        }

        // we are in chunk mode, lets send the current progress
        $handler = $save->handler();
        assert($handler instanceof AbstractHandler);
        $this->logUploadRequest($request, $logger,'chunk-upload.controller.chunk-progress', [
            'is_finished' => false,
            'handler' => get_class($handler),
            'done' => $handler->getPercentageDone(),
        ]);
        return response()->json([
            "done" => $handler->getPercentageDone()
        ]);
    }
}
