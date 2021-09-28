pragma solidity ^0.8.0;

interface IDragonsLair {
    function enter(uint256 amount) external;
    function leave(uint256 amount) external;
    function balanceOf(address account) external view returns (uint256);
    function dQUICKForQUICK(uint256 amount) external view returns (uint256);
    function QUICKForDQUICK(uint256 amount) external view returns (uint256);
}