const Group = class {
    constructor(armyType, numOfUnits, hitpoints, attackDamage, initiative, damageType, weaknesses, immunities) {
        this.armyType = armyType;
        this.numOfUnits = numOfUnits;
        this.hitpoints = hitpoints;
        this.attackDamage = attackDamage;
        this.initiative = initiative;
        this.damageType = damageType;
        this.weaknesses = weaknesses ? weaknesses : [];
        this.immunities = immunities ? immunities : [];
        this.target = null;
        this.dead = false;
    }

    compare(otherGroup) {
        let diff = otherGroup.effectivePower() - this.effectivePower();

        return diff === 0 ? otherGroup.initiative - this.initiative : diff;
    }

    effectivePower() {
        return this.numOfUnits * this.attackDamage;
    }

    selectTarget(enemies) {
        let newTarget = enemies.filter(e => e.weaknesses.includes(this.damageType))
                               .sort((g1, g2) => g1.compare(g2))
                               .shift();

        if (!newTarget) {
            newTarget = enemies.filter(e => !e.immunities.includes(this.damageType))
                               .sort((g1, g2) => g1.compare(g2))
                               .shift();
        }

        if (!newTarget) {
            newTarget = null;
        }

        this.target = newTarget;

        if (newTarget) {
            enemies.splice(enemies.indexOf(newTarget), 1);
        }
    }

    attackTarget() {
        if (!this.dead && this.target) {
            let damage = this.target.weaknesses.includes(this.damageType) ? this.effectivePower() * 2 : this.effectivePower();
            this.target.takeDamage(damage);
            this.target = null;
        }
    }

    takeDamage(damage) {
        this.numOfUnits -= Math.floor(damage / this.hitpoints);

        if (this.numOfUnits <= 0) {
            this.dead = true;
            this.numOfUnits = 0;
        }      
    }  

    applyBoost(boost) {
        this.attackDamage += boost;
    }

};

module.exports = Group;