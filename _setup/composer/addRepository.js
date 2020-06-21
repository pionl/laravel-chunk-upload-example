function addRepository (composerJson, repository) {
    if (typeof composerJson.repositories === 'undefined') {
        composerJson.repositories = [repository]
    } else {
        // Add example repository only if not already stored.
        let isExampleRepositoryAlreadyStored = false
        composerJson.repositories.forEach(existingRepository => {
            if (typeof existingRepository.url === 'string' && existingRepository.url === repository.url) {
                isExampleRepositoryAlreadyStored = true;
                return false;
            }
        })

        if (isExampleRepositoryAlreadyStored === false) {
            composerJson.repositories.push(repository)
        }
    }
}
module.exports = addRepository
