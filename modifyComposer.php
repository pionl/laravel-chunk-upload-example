<?php

/**
 * We need to set custom repositories entry to reference example service provider.
 */

if (!isset($argv[1])) {
    echo "Please provide a Laravel version (directory name)".PHP_EOL;
    die();
}

$composerFilePath = './' . filter_var($argv[1], FILTER_SANITIZE_STRING) . '/composer.json';
$composerFileContent = file_get_contents($composerFilePath);

try {
    if ($composerFileContent === false) {
        throw new Exception('composer.json does not exists');
    }

    $jsonContent = json_decode($composerFileContent, true);

    if ($jsonContent === null) {
        throw new Exception('Invalid json content');
    }

    $exampleRepository = [
        'type' => 'path',
        'url' => '../example/'
    ];

    // Enter or alter existing repositories section
    if (isset($jsonContent['repositories']) === false) {
        $jsonContent['repositories'] = [$exampleRepository];
    } else {
        $isExampleRepositoryAlreadyStored = false;
        foreach ($jsonContent['repositories'] as $repository) {
            if (isset($repository['url']) && $repository['url'] === $exampleRepository['url']) {
                $isExampleRepositoryAlreadyStored = true;
                break;
            }
        }

        if ($isExampleRepositoryAlreadyStored) {
            echo "Composer already contains example repository".PHP_EOL;
            die(0);
        }

        $jsonContent['repositories'][] = $exampleRepository;
    }

    // Laravel < 5.5 does not allow dev-packages to be installed
    $jsonContent['minimum-stability'] = 'dev';
    $jsonContent['prefer-stable'] = true;

    $finalComposerJsonString = json_encode($jsonContent, JSON_PRETTY_PRINT);
    $result = file_put_contents($composerFilePath, $finalComposerJsonString);

    if ($result === false) {
        throw Exception('Failed to alter composer.json');
    }
    die(0);
} catch (Exception $exception) {
    echo $exception->getMessage().PHP_EOL;
    die(1);
}
