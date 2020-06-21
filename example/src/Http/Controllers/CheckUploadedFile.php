<?php

namespace Pion\Laravel\ChunkUploadExample\Http\Controllers;

use Illuminate\Routing\Controller as BaseController;

class CheckUploadedFile extends BaseController
{
    /**
     * ONLY FOR TESTS!
     *
     * @param $mime
     * @param $dateFolder
     * @param $fileName
     *
     * @return false|string
     */
    public function check($mime, $dateFolder, $fileName)
    {
        // Build the file path
        $filePath = "upload/{$mime}/{$dateFolder}/{$fileName}";
        $finalPath = storage_path("app/{$filePath}");

        if (file_exists($finalPath) === false) {
            return response('file_not_found', 404);
        }

        return sha1_file($finalPath);
    }
}
