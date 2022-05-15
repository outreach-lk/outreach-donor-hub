/**
 * listens to Donation_Claim change events and update relevant causes.
 */

import Cause from "../../data/entities/cause.entity";
import AppEvent from "../../data/entities/event.entity";
import CauseRepo from "../../data/repos/cause.repo";
import { CauseDto } from "../../types/dtos/cause.dtos";
import { DonationDto } from "../../types/dtos/donation.dtos";
import { EventDto } from "../../types/dtos/event.dtos";

export async function onDonationClaimAcknowledged(e: EventDto) {
  const cause = await CauseRepo.getRepo()
    .get(e.topic)
    .then((res) => {
      return new Cause(res.data as CauseDto);
    });
  cause.currentCollection.acknowledged += (e.payload as DonationDto).amount;
  cause.currentCollection.pending -= (e.payload as DonationDto).amount;

  cause.update();
}

export async function onDonationClaimDeclined(e: EventDto) {
  const cause = await CauseRepo.getRepo()
    .get(e.topic)
    .then((res) => {
      return new Cause(res.data as CauseDto);
    });
  cause.currentCollection.acknowledged -= (e.payload as DonationDto).amount;
  cause.currentCollection.pending += (e.payload as DonationDto).amount;
  cause.update();
}
