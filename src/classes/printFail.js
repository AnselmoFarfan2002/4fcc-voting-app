function printFail( validation ){
    validation.errors.forEach((error, index) => {
        console.log(`Error ${index + 1}:`)
        console.log(`- Keyword: ${error.keyword}`)
        console.log(`- Data path: ${error.dataPath}`)
        console.log(`- Message: ${error.message}`)
        console.log(`- Schema path: ${error.schemaPath}`)
        console.log('-------------------------------------')
    })

    console.log(validation.errors)

    throw new Error('An error occurred during validation')
}

module.exports = printFail