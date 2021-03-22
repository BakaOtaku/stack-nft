use cosmwasm_std::StdError;
use thiserror::Error;

#[derive(Error, Debug)]
pub enum ContractError {
    #[error("{0}")]
    Std(#[from] StdError),

    #[error("Unauthorized")]
    Unauthorized {},

    #[error("token_id already claimed")]
    Claimed {},

    #[error("Cannot set approval that is already expired")]
    Expired {},

    #[error("Not a valid request")]
    Invalid {},
}
// docker run --rm -v "$(pwd)":/code \
//   --mount type=volume,source="$(basename "$(pwd)")_cache",target=/code/target \
//   --mount type=volume,source=registry_cache,target=/usr/local/cargo/registry \
//   cosmwasm/rust-optimizer:0.10.8