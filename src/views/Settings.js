export default function Settings() {
    return (
      <>
        <div className="mt-10 sm:mt-0">
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <div className="px-4 sm:px-0">
                <h3 className="text-lg font-medium leading-6 text-gray-900">Personal Information</h3>
                <p className="mt-1 text-sm text-gray-600">Enter your information to begin a challenge</p>
              </div>
            </div>
            <div className="mt-5 md:mt-0 md:col-span-2">
              <form action="#" method="POST">
                <div className="shadow overflow-hidden sm:rounded-md">
                  <div className="px-4 py-5 bg-white sm:p-6">
                    <div className="grid grid-cols-6 gap-6">
                      <div className="col-span-6 sm:col-span-4">
                        <label htmlFor="user-address" className="block text-sm font-medium text-gray-700">
                          Your Account
                        </label>
                        <input
                        disabled
                          type="text"
                          name="user-address"
                          id="user-address"
                          autoComplete="address"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
  
                      <div className="col-span-6 sm:col-span-2">
                        <label htmlFor="network" className="block text-sm font-medium text-gray-700">
                          Network
                        </label>
                        <select
                            disabled
                          id="network"
                          name="network"
                          autoComplete="network"
                          className="disbaled:opacity-50 mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                          <option>Kovan</option>
                          <option>Rinkeby</option>
                          <option>Mainnet</option>
                        </select>
                      </div>
  
                      <div className="col-span-6">
                        <label htmlFor="oura-access-token" className="block text-sm font-medium text-gray-700">
                          Oura Access Token
                        </label>
                        <input
                          type="text"
                          name="oura-access-token"
                          id="oura-access-token"
                          autoComplete="oura-access-token"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
  
                      <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                        <label htmlFor="num-of-days" className="block text-sm font-medium text-gray-700">
                          Number of Days
                        </label>
                        <input
                          type="text"
                          name="num-of-days"
                          id="num-of-days"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
  
                      <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                        <label htmlFor="num-of-steps" className="block text-sm font-medium text-gray-700">
                          Number of Steps
                        </label>
                        <input
                          type="text"
                          name="num-of-steps"
                          id="num-of-steps"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
  
                      <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                        <label htmlFor="bet-amount" className="block text-sm font-medium text-gray-700">
                          Bet Amount (in ETH)
                        </label>
                        <input
                          type="text"
                          name="bet-amount"
                          id="bet-amount"
                          autoComplete="bet-amount"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                    <button
                      type="submit"
                      className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
  
        <div className="hidden sm:block" aria-hidden="true">
          <div className="py-5">
            <div className="border-t border-gray-200" />
          </div>
        </div>
    </>
    )
  }

  export { Settings };