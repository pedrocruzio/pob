import { useState } from 'react';
import { ethers } from 'ethers';

import { requestAccount } from '../utils';

function CreateChallenge() {
    const ouraAccessToken, numberOfDays, numberOfSteps, betAmount;

    return (
        <div>
            <form>
                <label>
                    Enter Oura Access Token:
                    <input type="text" name="ouraAccessToken" />
                </label>
                <label>
                    Number of Days:
                    <input type="number" name="numberOfDays" />
                </label>
                <label>
                    Number of Steps:
                    <input type="number" name="numberOfSteps" />
                </label>
                <label>
                    Bet Amount:
                    <input type="number" name="betAmount" />
                </label>
                <input type="submit" value="Submit" />
            </form>
        </div>
    )
}

export { CreateChallenge };